export type ReserveInfo =
    {
        departureDateTime: Date;
        cancellationDeadline?: Date | null; // timestamp
        systemTime: Date; // timestamp
    }

// src/sum.ts
export function cancellationFlagDetermine(info: ReserveInfo): boolean {

    //キャンセル期限がNULLの場合
    if (info.cancellationDeadline == null ) {
        //出発時刻を過ぎていなければキャンセル可能
        if (info.departureDateTime > info.systemTime) {
            return true;
        } else {
            return false;
        }
    //NULLでない場合
    }else {
        ///出発時刻を過ぎていなければキャンセル期限日時の判定に移る
        if (info.departureDateTime > info.systemTime) {
            //システム日時がキャンセル期限日時を過ぎていればキャンセル不可
            if (info.cancellationDeadline > info.systemTime ) {
                return true;
            } else {
                return false;
            }
        //出発時刻を過ぎていればキャンセル日時に関わらずキャンセル不可とする            
        } else {
            return false;
        }
    }
}
