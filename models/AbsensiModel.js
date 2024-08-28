import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT ' +
        'rs_id, ' +
        'nama_rs, ' +
       
        'rl_32_bulan_1, ' +
        'rl_32_bulan_2, ' +
        'rl_32_bulan_3, ' +
        'rl_32_bulan_4, ' +
        'rl_32_bulan_5, ' +
        'rl_32_bulan_6, ' +
        'rl_32_bulan_7, ' +
        'rl_32_bulan_8, ' +
        'rl_32_bulan_9, ' +
        'rl_32_bulan_10, ' +
        'rl_32_bulan_11, ' +
        'rl_32_bulan_12, '  +
        'rl_37_bulan_1, ' +
        'rl_37_bulan_2, ' +
        'rl_37_bulan_3, ' +
        'rl_37_bulan_4, ' +
        'rl_37_bulan_5, ' +
        'rl_37_bulan_6, ' +
        'rl_37_bulan_7, ' +
        'rl_37_bulan_8, ' +
        'rl_37_bulan_9, ' +
        'rl_37_bulan_10, ' +
        'rl_37_bulan_11, ' +
        'rl_37_bulan_12, '  +
        'rl_39_bulan_1, ' +
        'rl_39_bulan_2, ' +
        'rl_39_bulan_3, ' +
        'rl_39_bulan_4, ' +
        'rl_39_bulan_5, ' +
        'rl_39_bulan_6, ' +
        'rl_39_bulan_7, ' +
        'rl_39_bulan_8, ' +
        'rl_39_bulan_9, ' +
        'rl_39_bulan_10, ' +
        'rl_39_bulan_11, ' +
        'rl_39_bulan_12, '  +
        'rl_317, ' +
        'rl_318, ' +
        'rl_52_bulan_1, ' +
        'rl_52_bulan_2, ' +
        'rl_52_bulan_3, ' +
        'rl_52_bulan_4, ' +
        'rl_52_bulan_5, ' +
        'rl_52_bulan_6, ' +
        'rl_52_bulan_7, ' +
        'rl_52_bulan_8, ' +
        'rl_52_bulan_9, ' +
        'rl_52_bulan_10, ' +
        'rl_52_bulan_11, ' +
        'rl_52_bulan_12, '  +
        'rl_53_bulan_1, ' +
        'rl_53_bulan_2, ' +
        'rl_53_bulan_3, ' +
        'rl_53_bulan_4, ' +
        'rl_53_bulan_5, ' +
        'rl_53_bulan_6, ' +
        'rl_53_bulan_7, ' +
        'rl_53_bulan_8, ' +
        'rl_53_bulan_9, ' +
        'rl_53_bulan_10, ' +
        'rl_53_bulan_11, ' +
        'rl_53_bulan_12 '
    
    const sqlFrom = 'FROM ' +
        'absensi '

    const sqlWhere = 'WHERE '

    const sqlOrder = 'ORDER BY nama_rs'

    const filter = []
    const sqlFilterValue = []

    const provinsiId = req.query.provinsiId || null
    const kabKotaId = req.query.kabKotaId || null
    const namaRS = req.query.namaRS || null

    if (provinsiId != null) {
        filter.push("provinsi_id IN (?) ")
        sqlFilterValue.push(req.query.provinsiId)
    }

    if (kabKotaId != null) {
        filter.push("kab_kota_id IN (?) ")
        sqlFilterValue.push(req.query.kabKotaId)
    }

    if (namaRS != null) {
        filter.push("nama_rs like ?")
        sqlFilterValue.push('%'.concat(namaRS).concat('%'))
    }

    let sqlFilter = ''
    filter.forEach((value, index) => {
        if (index == 0) {
            sqlFilter = sqlWhere.concat(value)
        } else if (index > 0) {
            sqlFilter = sqlFilter.concat(' AND ').concat(value)
        }
    })

    const sql = sqlSelect.concat(sqlFrom).concat(sqlFilter).concat(sqlOrder)
    databaseSIRS.query(sql, {
        type: QueryTypes.SELECT,
        replacements: sqlFilterValue
    })
    .then((res) => {
        callback(null, res)
    })
    .catch((error) => {
        callback(error, null)
    })
}