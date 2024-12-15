import {getInput} from '@actions/core'
import {deployToOss} from './ossUpload'


const dir = getInput('dir')
const targetDir = getInput('targetDir')
if (!dir || !targetDir) {
  throw new Error('请配置上传目录和目标目录')
}

deployToOss(dir, targetDir).then(() => {
  console.log('上传成功')
})
