import {
    Icon,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    BadgeDelta,
    Title,
    Flex,
    Select,
    SelectItem,
    MultiSelect,
    MultiSelectItem,
    DeltaType,
} from '@tremor/react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
export type Student = {
    name: string;
    leads: number;
    sales: string;
    quota: string;
    variance: string;
    region: string;
    status: string;
    level: string;
    subject: string;
};

export const salesPeople: Student[] = [
    {
        name: 'Peter Doe',
        leads: 45,
        sales: '1,000,000',
        quota: '1,200,000',
        variance: 'low',
        region: 'Region A',
        status: 'overperforming',
        level: 'primary',
        subject: 'Physics',
    },
    {
        name: 'Lena Whitehouse',
        leads: 35,
        sales: '900,000',
        quota: '1,000,000',
        variance: 'low',
        region: 'Region B',
        status: 'average',
        level: 'primary',
        subject: 'Physics',
    },
    {
        name: 'Phil Less',
        leads: 52,
        sales: '930,000',
        quota: '1,000,000',
        variance: 'medium',
        region: 'Region C',
        status: 'underperforming',
        level: 'college',
        subject: 'Biology',
    },
    {
        name: 'John Camper',
        leads: 22,
        sales: '390,000',
        quota: '250,000',
        variance: 'low',
        region: 'Region A',
        status: 'overperforming',
        level: 'secondary',
        subject: 'Chemistry',
    },
    {
        name: 'Max Balmoore',
        leads: 49,
        sales: '860,000',
        quota: '750,000',
        variance: 'low',
        region: 'Region B',
        status: 'overperforming',
        level: 'college',
        subject: 'Physics',
    },
];

const deltaTypes: { [key: string]: DeltaType } = {
    average: 'unchanged',
    overperforming: 'moderateIncrease',
    underperforming: 'moderateDecrease',
};

export default function SalesPeopleTable() {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const isStudentSelected = (salesPerson: Student) =>
        (salesPerson.level === selectedLevel || selectedLevel === 'all') &&
        (salesPerson.status === selectedStatus || selectedStatus === 'all') &&
        (selectedNames.includes(salesPerson.name) ||
            selectedNames.length === 0);

    return (
        <>
            <div>
                <Flex
                    className="space-x-0.5"
                    justifyContent="start"
                    alignItems="center"
                >
                    <Title> Students List </Title>
                    <Icon
                        icon={InformationCircleIcon}
                        variant="simple"
                        tooltip="Shows sales performance per employee"
                    />
                </Flex>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
                <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    onValueChange={setSelectedNames}
                    placeholder="Select Students..."
                >
                    {salesPeople.map((item) => (
                        <MultiSelectItem key={item.name} value={item.name}>
                            {item.name}
                        </MultiSelectItem>
                    ))}
                </MultiSelect>
                <Select
                    className="max-w-full sm:max-w-xs"
                    defaultValue="all"
                    onValueChange={setSelectedStatus}
                >
                    <SelectItem value="all">All Performances</SelectItem>
                    <SelectItem value="overperforming">
                        Overperforming
                    </SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="underperforming">
                        Underperforming
                    </SelectItem>
                </Select>
                <Select
                    className="max-w-full sm:max-w-xs"
                    defaultValue="all"
                    onValueChange={setSelectedLevel}
                >
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                </Select>
            </div>
            <Table className="mt-6">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell className="text-right">
                            Subject
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                            Revenue ($)
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                            Level
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                            Status
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {salesPeople
                        .filter((item) => isStudentSelected(item))
                        .map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">
                                    {item.leads}
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.sales}
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.level}
                                </TableCell>
                                <TableCell className="text-right">
                                    <BadgeDelta
                                        deltaType={deltaTypes[item.status]}
                                        size="xs"
                                    >
                                        {item.status}
                                    </BadgeDelta>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}
