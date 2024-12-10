import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { Icon, PointTd, Table, Td, Th } from "../../../Common/module/etc/TableFormStyle";
import PaginationButtons from "../../../Common/Component/button/PaginationButtons";

interface PointLog {
    useDate: string,
    useDetail: string,
    usePoint: number,
    remainPoint: number    
}

interface PointLogTableProps {
    columns: string[];
    pointLogList: PointLog[];
}

const useDetailMapping: Record<string, string> = {
    'CHARGE': '포인트 충전',
    'BUY_PRODUCT': '상품 구매',
    'SELL_PRODUCT': '상품 판매',
    'REQ_QNA': '질문 작성',
    'ADOPTED_QNA': '답변 채택',
    'GROUP_HAED_INCREMENT': '스터디 룸 증원'
};


const PointLogTable: React.FC<PointLogTableProps> = ({ columns, pointLogList}) => {
    return (
        <CustomDivStyle marginTop={50}>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <Th key={index}>{column}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pointLogList.map((pointLog, logIndex) => (
                        <tr key={logIndex}>
                            <PointTd>
                                {pointLog.useDate}
                            </PointTd>
                            <PointTd>
                                {useDetailMapping[pointLog.useDetail] || '기타'}
                            </PointTd>
                            <PointTd>
                                {pointLog.usePoint}p
                            </PointTd>
                            <PointTd>
                                {pointLog.remainPoint}p
                            </PointTd>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </CustomDivStyle>
    );
};

export default PointLogTable;
