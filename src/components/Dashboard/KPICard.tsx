import {
    BadgeDelta,
    Card,
    Flex,
    Metric,
    ProgressBar,
    Text,
} from '@tremor/react';
import { Kpi } from '@/lib/types';
import { FC } from 'react';

interface Props {
    item: Kpi;
}
// Single KPI card in the demo dashboard with sample inputs
const KpiCard: FC<Props> = ({ item }) => {
    return (
        <Card key={item.title}>
            <Flex alignItems="start">
                <div className="truncate">
                    <Text>{item.title}</Text>
                    <Metric className="truncate">{item.metric}</Metric>
                </div>
                <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
            </Flex>
            <Flex className="mt-4 space-x-2">
                <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                <Text>{item.target}</Text>
            </Flex>
            <ProgressBar value={item.progress} className="mt-2" />
        </Card>
    );
};

export default KpiCard;
