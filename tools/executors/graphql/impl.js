const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const { FeatureFlags } = require('amplify-cli-core');
const { AuthTransformer } = require('@aws-amplify/graphql-auth-transformer');
const {
  DefaultValueTransformer,
} = require('@aws-amplify/graphql-default-value-transformer');
const {
  FunctionTransformer,
} = require('@aws-amplify/graphql-function-transformer');
const { HttpTransformer } = require('@aws-amplify/graphql-http-transformer');
const {
  IndexTransformer,
  PrimaryKeyTransformer,
} = require('@aws-amplify/graphql-index-transformer');
const { ModelTransformer } = require('@aws-amplify/graphql-model-transformer');
const {
  PredictionsTransformer,
} = require('@aws-amplify/graphql-predictions-transformer');
const {
  BelongsToTransformer,
  HasManyTransformer,
  HasOneTransformer,
  ManyToManyTransformer,
} = require('@aws-amplify/graphql-relational-transformer');
const {
  SearchableModelTransformer,
} = require('@aws-amplify/graphql-searchable-transformer');

const {
  GraphQLTransform,
  ConflictHandlerType,
} = require('@aws-amplify/graphql-transformer-core');

// now exported here:
// https://github.com/aws-amplify/amplify-cli/blob/59c64224eb722d826952a0a85f68f57ec590255f/packages/amplify-category-api/src/graphql-transformer/utils.ts
const {
  writeDeploymentToDisk,
} = require('@aws-amplify/amplify-category-api/lib/graphql-transformer/utils.js');

const SCHEMA_FILE = 'schema.graphql';
const SCHEMA_DIRECTORY = 'schema';

const authConfig = {
  defaultAuthentication: {
    authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  },
  additionalAuthenticationProviders: [
    {
      authenticationType: 'AWS_IAM',
    },
  ],
};

// TODO: it could be useful to check this code on how to setup feature flags
// https://github.com/aws-amplify/amplify-cli/blob/dev/packages/amplify-cli-core/src/feature-flags/featureFlags.ts
const featureFlags = {
  getBoolean(_, defaultValue) {
    return defaultValue ?? true;
  },
  getString(_, defaultValue) {
    return defaultValue;
  },
  getNumber(_, defaultValue) {
    return defaultValue;
  },
  getObject() {
    throw new Error('Not implemented');
  },
  getValue(featureName, type, defaultValue) {
    return defaultValue;
  },
};

// https://github.com/aws-amplify/amplify-cli/blob/9d9e0119c131f4b21b2622e30f122993635cf359/packages/amplify-provider-awscloudformation/src/graphql-transformer/transform-graphql-schema.ts
async function createTransformer(options) {
  const modelTransformer = new ModelTransformer();
  const indexTransformer = new IndexTransformer();
  const hasOneTransformer = new HasOneTransformer();
  const authTransformer = new AuthTransformer({
    adminRoles: options.adminRoles ?? [],
    identityPoolId: options.identityPoolId,
  });

  const transformerList = [
    modelTransformer,
    new FunctionTransformer(),
    new HttpTransformer(),
    new PredictionsTransformer(options?.storageConfig),
    new PrimaryKeyTransformer(),
    indexTransformer,
    new BelongsToTransformer(),
    new HasManyTransformer(),
    hasOneTransformer,
    new ManyToManyTransformer(
      modelTransformer,
      indexTransformer,
      hasOneTransformer,
      authTransformer
    ),
    new DefaultValueTransformer(),
    authTransformer,
    // TODO: initialize transformer plugins
  ];

  if (options?.addSearchableTransformer) {
    transformerList.push(new SearchableModelTransformer());
  }

  const transformer = new GraphQLTransform({
    transformers: transformerList,
    authConfig,
    stacks: {},
    resolverConfig: {
      project: {
        ConflictHandler: ConflictHandlerType.AUTOMERGE,
        ConflictDetection: 'VERSION',
      },
    },
    sandboxModeEnabled: false,
    featureFlags,
  });
  return transformer;
}

// https://github.com/aws-amplify/amplify-cli/blob/07040c2b2197eeb4ad1fb3fb001ff6ad03b95f0e/packages/amplify-graphql-transformer-migrator/src/schema-migrator.ts#L148
async function getSchemaDocs(resourceDir) {
  const schemaFilePath = path.join(resourceDir, SCHEMA_FILE);
  const schemaDirectoryPath = path.join(resourceDir, SCHEMA_DIRECTORY);
  const schemaFileExists = fs.existsSync(schemaFilePath);
  const schemaDirectoryExists = fs.existsSync(schemaDirectoryPath);

  if (!schemaFileExists && !schemaDirectoryExists) {
    return [];
  }
  if (schemaFileExists) {
    return [
      {
        schema: await fs.readFile(schemaFilePath, 'utf8'),
        filePath: schemaFilePath,
      },
    ];
  } else if (schemaDirectoryExists) {
    const schemaFiles = glob
      .sync('**/*.graphql', { cwd: schemaDirectoryPath })
      .map((fileName) => path.join(schemaDirectoryPath, fileName));
    return await Promise.all(
      schemaFiles.map(async (fileName) => ({
        schema: await fs.readFile(fileName, 'utf8'),
        filePath: fileName,
      }))
    );
  }
  return [];
}

function combineSchemas(schemaDocs) {
  const schemaList = new Array(schemaDocs.length);
  schemaDocs.forEach((doc, idx) => {
    schemaList[idx] = doc.schema;
  });

  return schemaList.join('\n');
}

// https://github.com/aws-amplify/amplify-cli/blob/3f2e647b9dfe14aa5919b46f53342937dd0c7fa9/packages/amplify-provider-awscloudformation/src/transform-graphql-schema.ts#L60
exports['default'] = async function graphqlTransformerExecutor(
  options,
  context
) {
  console.info(`Executing AWS Amplify Graphql Transformer`);

  const schemaDocs = await getSchemaDocs(path.normalize(options.schemaPath));
  const schema = combineSchemas(schemaDocs);

  const transformer = await createTransformer(options);
  const deployment = transformer.transform(schema);

  // This is indirectly called from here:
  // https://github.com/aws-amplify/amplify-cli/blob/e6586af2b3f541edf426ddea953aad32546c9e91/packages/amplify-cli-core/src/plugin-facade/cloudformation-provider-facade.ts#L36
  const ctx = {
    amplify: {
      getProviderPlugins() {
        return {
          awscloudformation: 'amplify-provider-awscloudformation',
        };
      },
    },
  };

  FeatureFlags.instance = featureFlags;

  // writeDeploymentToDisk was moved out of the amplify-provider-awscloudformation package and now it requires a Context and FeatureFlags to be configured
  // check this code out in case it is needed to perform this action, but for now it will use an older version of the package which still includes this function
  // https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/index.ts#L166
  await writeDeploymentToDisk(
    // Context used here:
    // https://github.com/aws-amplify/amplify-cli/blob/e6586af2b3f541edf426ddea953aad32546c9e91/packages/amplify-cli-core/src/plugin-facade/cloudformation-provider-facade.ts#L36
    ctx,
    deployment,
    options.outputPath,
    'appsync.cloudformation.json',
    {}
  );

  return { success: true };
};
