import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as cfninc from 'aws-cdk-lib/cloudformation-include';

import { readdirSync } from 'fs';
import { normalize, join } from 'path';

interface NestedStacksReferences {
  [key: string]: cfninc.IncludedNestedStack;
}

export class GraphQlApiStack extends cdk.NestedStack {
  public readonly graphqlApiId: string;
  public readonly graphqlApiEndpoint: string;
  public readonly nestedStacks: NestedStacksReferences;

  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    new cdk.CfnParameter(this, 'cognitoUserPoolId', {
      type: 'String',
      description: 'Auth Cognito User Pool ID',
    });
    new cdk.CfnParameter(this, 'authenticatedRoleName', {
      type: 'String',
      description:
        'Reference to the name of the Auth Role created for the project',
    });
    new cdk.CfnParameter(this, 'unauthenticatedRoleName', {
      type: 'String',
      description:
        'Reference to the name of the Unauthenticated Role created for the project',
    });
    new cdk.CfnParameter(this, 's3DeploymentBucket', {
      type: 'String',
      description: 'S3 bucket containing all the Appsync deployment artefacts',
    });
    new cdk.CfnParameter(this, 's3DeploymentRootKey', {
      type: 'String',
      description: 'S3 deployment rook key',
    });

    const apiNestedStacks = readdirSync(
      normalize(join(__dirname, 'build', 'stacks'))
    ).reduce(
      (aggregate, file) => ({
        ...aggregate,
        [file.replace('.json', '')]: {
          templateFile: normalize(join(__dirname, 'build', 'stacks', file)),
          preserveLogicalIds: true,
          parameters: {},
        },
      }),
      {}
    );
    const graphQlApiStack = new cfninc.CfnInclude(this, 'GraphqlApi', {
      templateFile: normalize(
        join(__dirname, 'build', 'appsync.cloudformation.json')
      ),
      preserveLogicalIds: true,
      loadNestedStacks: apiNestedStacks,
      parameters: {
        AppSyncApiName: 'aws-amplify-cdk',
        AuthCognitoUserPoolId: props.parameters.cognitoUserPoolId,
        authRoleName: props.parameters.authenticatedRoleName,
        unauthRoleName: props.parameters.unauthenticatedRoleName,
        S3DeploymentBucket: props.parameters.s3DeploymentBucket,
        S3DeploymentRootKey: props.parameters.s3DeploymentRootKey,
        DynamoDBEnablePointInTimeRecovery: 'true',
        DynamoDBEnableServerSideEncryption: 'true',
        env: 'dev',
      },
    });
    this.graphqlApiId = graphQlApiStack.getOutput('GraphQLAPIIdOutput').value;
    this.graphqlApiEndpoint = graphQlApiStack.getOutput(
      'GraphQLAPIEndpointOutput'
    ).value;

    // includes all the relevant nested stacks so that could be referenced from the parent stack
    this.nestedStacks = Object.keys(apiNestedStacks).reduce(
      (stacks, name) => ({
        ...stacks,
        [name]: graphQlApiStack.getNestedStack(name),
      }),
      {}
    );
  }
}
