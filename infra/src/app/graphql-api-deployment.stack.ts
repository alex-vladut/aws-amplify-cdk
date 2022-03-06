import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

import { normalize, join } from 'path';
import { readFileSync } from 'fs';
import { createHash } from 'crypto';

export class GraphQlApiDeploymentStack extends cdk.NestedStack {
  public readonly bucket: s3.Bucket;
  public readonly appsyncFilesKey: string;

  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'AppsyncDeploymentBucket');

    const path = normalize(join(__dirname, 'build', 'schema.graphql'));
    this.appsyncFilesKey = `appsync-files/${generateHashForFile(path)}`;

    new s3deploy.BucketDeployment(this, 'AppsyncFilesDeployment', {
      sources: [s3deploy.Source.asset(normalize(join(__dirname, 'build')))],
      destinationBucket: this.bucket,
      destinationKeyPrefix: this.appsyncFilesKey,
      memoryLimit: 2048,
    });
  }
}

function generateHashForFile(path: string) {
  const file = readFileSync(path);
  const hash = createHash('sha256');
  hash.update(file);
  return hash.digest('hex');
}
