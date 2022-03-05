import * as cdk from 'aws-cdk-lib';
import { CdkStack } from './app/cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'CdkStack', {});
