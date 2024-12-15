import * as core from '@actions/core'
import OSS from 'ali-oss'
import {getInput} from '@actions/core'

const config = {
  accessKeyId: getInput('accessKeyId'),
  accessKeySecret: getInput('accessKeySecret'),
  region: getInput('region'),
  bucket: getInput('bucket')
}

if (
  !config.accessKeyId ||
  !config.accessKeySecret ||
  !config.region ||
  !config.bucket
) {
  throw new Error('请配置accessKeyId, accessKeySecret, region, bucket')
}

const client = new OSS(config)

export default client