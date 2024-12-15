import fs from 'fs'
import client from './ossClient'
import * as core from '@actions/core'

export async function deployToOss(localPath: string, targetPath: string): Promise<any[]> {
  const docs = fs.readdirSync(localPath)
  const fileMap = docs.map(async function(doc) {
    const _src = `${localPath}/${doc}`,
      _dist = `${targetPath}/${doc}`
    const st = fs.statSync(_src)
    if (st.isFile()) return putOSS(_dist, _src)
    return deployToOss(_src, _dist)
  })
  return Promise.all(fileMap)
}

/**
 * 上传文件到 OSS
 * @param {string} uploadPath 表示上传到 OSS 的 Object 名称
 * @param {string} logoFilePath 本地文件夹或者文件路径
 */
async function putOSS(uploadPath: string, logoFilePath: string): Promise<string> {
  let tryTime = 0
  try {
    tryTime++
    const result = await client.put(uploadPath, logoFilePath)
    core.info(
      `${new Date().toLocaleString()}>>>${uploadPath} uploaded successfully`
    )
    return result
  } catch (err) {
    if (tryTime === 3) {
      throw new Error(`${logoFilePath} upload failed`)
    }
    return putOSS(uploadPath, logoFilePath)
  }
}