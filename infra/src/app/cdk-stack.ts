import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { AuthStack } from './auth.stack';
import { GraphQlApiDeploymentStack } from './graphql-api-deployment.stack';
import { GraphQlApiStack } from './graphql-api.stack';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authStack = new AuthStack(this, 'AuthStack');
    const graphqlApiDeploymentStack = new GraphQlApiDeploymentStack(
      this,
      'GraphQlApiDeploymentStack'
    );
    const graphqlApiStack = new GraphQlApiStack(this, 'GraphQlApiStack', {
      parameters: {
        cognitoUserPoolId: authStack.userPool.userPoolId,
        authenticatedRoleName: authStack.authenticatedRole.roleName,
        unauthenticatedRoleName: authStack.unauthenticatedRole.roleName,
        s3DeploymentBucket: graphqlApiDeploymentStack.bucket.bucketName,
        s3DeploymentRootKey: graphqlApiDeploymentStack.appsyncFilesKey,
      },
    });

    new cdk.CfnOutput(this, 'CognitoIdentityPoolId', {
      value: authStack.identityPool.ref,
    });
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: authStack.userPool.userPoolId,
    });
    new cdk.CfnOutput(this, 'UserPoolWebClientId', {
      value: authStack.userPoolClient.userPoolClientId,
    });
    new cdk.CfnOutput(this, 'AppsyncResolversBucketName', {
      value: graphqlApiDeploymentStack.bucket.bucketName,
    });
    new cdk.CfnOutput(this, 'AppsyncResolversKey', {
      value: graphqlApiDeploymentStack.appsyncFilesKey,
    });

    new cdk.CfnOutput(this, 'oauth', { value: '{}' });
    new cdk.CfnOutput(this, 'GraphqlApiId', {
      value: graphqlApiStack.graphqlApiId,
    });
    new cdk.CfnOutput(this, 'GraphqlApiEndpoint', {
      value: graphqlApiStack.graphqlApiEndpoint,
    });
  }
}
