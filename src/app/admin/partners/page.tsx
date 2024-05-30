'use client';

import { useState } from 'react';
import { RiMoreLine, RiUserForbidLine } from '@remixicon/react';
import clsx from 'clsx';

import { CreatePartner } from '@/features/create-partner';
import {
  AdminPartners,
  useBlockPartner,
  useGetAdminPartners,
  useUnblockPartner,
} from '@/shared';
import { Button, Container, Typography } from '@/shared/ui';
import { ColumnsType, Table } from '@/shared/ui/Table';
import { Tag } from '@/shared/ui/Tag';

export default function Page() {
  const [show, setShow] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, mutate, isLoading } = useGetAdminPartners(currentPage, 10);
  const { data: blockedUser, trigger: blockPartner } = useBlockPartner();
  const { data: unblockedUser, trigger: unblockPartner } = useUnblockPartner();

  const columns: ColumnsType<AdminPartners> = [
    { key: 'id', title: '№' },
    {
      key: 'firstName',
      title: 'Name',
      render: record => {
        return (
          <div className="flex flex-col">
            <Typography variant="caption" color="grey" weight="semibold">
              {record.first_name} {record.last_name}
            </Typography>
            <Typography variant="caption" color="grey">
              {record.email}
            </Typography>
          </div>
        );
      },
    },
    {
      key: 'is_blocked',
      title: 'Status',
      render: record => {
        return (
          <div>
            {!record.is_blocked ? (
              <Tag variant="success">Active</Tag>
            ) : (
              <Tag variant="danger">Blocked</Tag>
            )}
          </div>
        );
      },
    },
    { key: 'date_of_birth', title: 'Birth' },
    {
      key: 'actions',
      title: '',
      width: 'w-20',
      render: record => {
        return (
          <>
            {/* FIX_ME: Make it reusable */}
            <Button
              variant="ghost"
              size="sm"
              className="font-semibold"
              onClick={() => setShow(record.id)}
            >
              <RiMoreLine size={24} className="text-theme-grey-500" />
            </Button>

            <div
              className={clsx(
                'absolute -left-16 z-10 mt-1 hidden w-32 rounded-md border border-theme-grey-200 bg-theme-white p-2 shadow-lg',
                { ['!block']: show === record.id },
              )}
            >
              <Button
                variant="ghost"
                size="sm"
                width="full"
                className="justify-start font-medium text-theme-grey-500"
                onClick={() => {
                  if (!record.is_blocked) {
                    blockPartner({ email: record.email });
                  } else {
                    unblockPartner({ email: record.email });
                  }

                  // FIX_ME: Mutate data
                  const newData = data?.results?.map(item => {
                    if (item.id === record.id) {
                      item.is_blocked = !item.is_blocked;
                    }
                    return item;
                  });

                  //  mutate({ ...data, results: newData);
                  setShow(0);
                }}
              >
                <RiUserForbidLine size={16} />
                {!record.is_blocked ? 'Block' : 'Unblock'}
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <Container title="Partners">
      <CreatePartner />
      <Table<AdminPartners>
        columns={columns}
        data={data?.results}
        currentPage={currentPage}
        pages={data.pages}
        loading={isLoading}
        onChange={offset => setCurrentPage(offset)}
      />
    </Container>
  );
}
