import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Notifications from "aws-cdk-lib/aws-s3-notifications";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class L2CdkConstructDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //L2
    const l2Bucket = new s3.Bucket(this, "L2Bucket", {
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
    const l2Function = new lambda.Function(this, "L2Function", {
      code: lambda.Code.fromAsset("src/"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_18_X,
    });
    l2Bucket.grantReadWrite(l2Function);
    l2Bucket.addObjectCreatedNotification(
      new s3Notifications.LambdaDestination(l2Function)
    );
  }
}
