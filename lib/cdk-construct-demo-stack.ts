import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { L1CdkConstructDemoStack } from "./cdk-construct-demo-stack-l1";
import { L2CdkConstructDemoStack } from "./cdk-construct-demo-stack-l2";
import { L3CdkConstructDemoStack } from "./cdk-construct-demo-stack-l3";

export class CdkConstructDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new L1CdkConstructDemoStack(this, "L1CdkConstructDemoStack");
    new L2CdkConstructDemoStack(this, "L2CdkConstructDemoStack");
    new L3CdkConstructDemoStack(this, "L3CdkConstructDemoStack");
  }
}
