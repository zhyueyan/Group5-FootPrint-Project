/* eslint-disable prettier/prettier */
import React,{Component} from 'react'
import{
} from 'react-native'

import SQLiteManager from 'react-native-sqlite-storage'
//import {DB_name} from './sqlitConfig'

SQLiteManager.DEBUG(true);
let DB = undefined // 数据库对象
initDB();
//var createCache = 'CREATE TABLE IF NOT EXISTS cache( LATITUDE INT,  LONGITUDE INT );'
 //createTable(createCache);

/**
 * [initDB 创建数据库]
 * @param  {[type]} userID [用户id，每一个用户独立对应一个数据库]
 */
function initDB() {
  try {
    DB = SQLiteManager.openDatabase(
      {
        name: 'FootPrint.db', // 数据库名称
        //location: 'Documents' // 仅支持ios，DB在android的位置是固定的，在ios需要指定位置，默认 default(Library/LocalDatabase)
      },
      initDBSuccess,
      initDBError
    )
  } catch (e) {
    console.log('initDB error =', e)
  } finally {
  }
}

/**
 * [initDBSuccess 创建数据库成功输出]
 */
function initDBSuccess(){
  console.log('initDBSuccess')
}

/**
 * [initDBError 创建数据库失败输出]
 */
function initDBError(err){
  console.log('initDBError error =',err)
}

/**
 * [closeDB 关闭数据库]
 */
function closeDB(){
  if(DB){
    DB.close()
    console.log('close success')
  }else {
    console.log('not open')
  }
}

/**
 * [createTable 创建表]
 * @param  {[type]} sql             [sql 语句]
 * @param  {[type]} callBack        [回调   true, data ]
 */
async function createTable(sql, callBack) {
  console.log(`createTable is =${sql}`)
  await DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      () => {
        callBack && callBack(true)
        console.log(`createTable executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('createTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('createTable  transaction error=',err)
    },
    () => {
      console.log(`createTable transaction success`)
    })
}

/**
 * [insertDataToTable 插入或者更新数据]
 * @param  {[type]} tableName [表名]
 * @param  {[type]} data      [数据]
 */
async function insertDataToTable(tableName, data, callBack){
  let sql = `INSERT INTO ${tableName} (${Object.keys(data).join(',')}) VALUES (${Array(Object.keys(data).length).fill('?').join(',')})`
  console.log(`insertDataToTable ${tableName} sql is =${sql}`)
  await DB.transaction((tx) => {
    tx.executeSql(
      sql,
      Object.values(data),
      () => {
        callBack && callBack(true)
        console.log(`insertDataToTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('insertDataToTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('insertDataToTable  transaction error=',err)
    },
    () => {
      console.log(`insertDataToTable ${tableName} transaction success`)
    })
}


/**
 * [deleteDataFromTable 根据id从表中删除某一条数据]
 * @param  {[type]} tableName [表名]
 * @param  {[type]} key        [字段名称，要根据此字段进行删除对应的数据]
 * @param  {[type]} value        [要删除数据的唯一标识]
 */
async function deleteDataFromTable(tableName, key, value, callBack){
  var sql;
  if(key == null)  sql = `DELETE FROM ${tableName}`;
  else sql = `DELETE FROM ${tableName} WHERE ${key} = ${value}`;
  console.log(`deleteDataFromTable ${tableName} sql is =${sql}`)
  await DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      () => {
        callBack && callBack(true)
        console.log(`deleteDataFromTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('deleteDataFromTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('deleteDataFromTable  transaction error=',err)
    },
    () => {
      console.log(`deleteDataFromTable ${tableName} transaction success`)
    })
}

/**
 * [selectDataFromTable 查询表中所有数据]
 * @param  {[type]} tableName [表名]
 */
async function selectDataFromTable(tableName, callBack){
  let sql = `SELECT * FROM ${tableName}`
  console.log(`selectDataFromTable ${tableName} sql is =${sql}`)
  await DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        let datas = [];
        for(let i = 0; i < results.rows.length; i++){
          let info = results.rows.item(i);
          datas.push(info)
        }
        callBack && callBack(true, datas);
        console.log(`selectDataFromTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('selectDataFromTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('selectDataFromTable  transaction error=',err)
    },
    () => {
      console.log(`selectDataFromTable ${tableName} transaction success`)
    })
}

/**
 * [getMsgInfoFromTable 根据id获取某一条信息]
 * @param  {[type]} tableName [表名]
 * @param  {[type]} key        [字段名称，要根据此字段进行获取对应的数据]
 * @param  {[type]} value        [要获取数据的唯一标识]
 */
async function getMsgInfoFromTable(tableName, key, value, callBack){
  let sql = `SELECT * FROM ${tableName} WHERE ${key} = ${value}`
  console.log(`getMsgInfoFromTable ${tableName} sql is =${sql}`)
  await DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        callBack && callBack(true, results.rows.item(0))
        console.log(`getMsgInfoFromTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('getMsgInfoFromTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('getMsgInfoFromTable  transaction error=',err)
    },
    () => {
      console.log(`getMsgInfoFromTable ${tableName} transaction success`)
    })
}


/**
 * [dropTable 删除表]
 * @param  {[type]} tableName [表名]
 */
async function dropTable(tableName, callBack){
  let sql = `DROP TABLE ${tableName}`
  console.log(`dropTable ${tableName} sql is =${sql}`)
  await DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        callBack && callBack(true)
        console.log(`dropTable ${tableName} executeSql success`)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('dropTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('dropTable  transaction error=',err)
    },
    () => {
      console.log(`dropTable ${tableName} transaction success`)
    })
}

/**
 * [customSQL 自定义sql语句]
 * @param  {[type]} sql      [sql语句]
 */
async function  runCustomSQL(sql, callBack){
  await DB.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      (tx,results) => {
        console.log(`runCustomSQL  executeSql success`)
        if (results && results.rows){
          let datas = [];
          for(let i = 0; i < results.rows.length; i++){
            let info = results.rows.item(i);
            datas.push(info)
          }
          callBack && callBack(true, datas)
          return
        }
        callBack && callBack(true)
      },
      (err) => {
        callBack && callBack(false, err)
        console.log('runCustomSQL  executeSql error=',err)
      })
    },
    (err) => {
      console.log('runCustomSQL  transaction error=',err)
    },
    () => {
      console.log(`runCustomSQL  transaction success`)
    })
}

export  {
  initDB,
  closeDB,
  createTable,
  insertDataToTable,
  deleteDataFromTable,
  selectDataFromTable,
  getMsgInfoFromTable,
  dropTable,
  runCustomSQL
}
