import {useContext, useEffect} from 'react'
import {GridContext} from '../../hooks/GridContext';
import styles from '../../styles/Cell.module.scss';
export default function Cell({status, clickHandler}) {
    return (
        <div className={styles.cell + (status == 1 ? ' ' + styles.alive : '' )}
            onClick={clickHandler}
        />
    )
}
