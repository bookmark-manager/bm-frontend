import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import type { FC, ReactNode } from 'react';
import classes from './BookmarkModal.module.css';
import type { BookmarkFormValues } from '../../types/bookmark-form-values';

interface BookmarkModalProps {
  title: ReactNode;
  initialValues?: BookmarkFormValues;
  onSubmit: (values: BookmarkFormValues) => void;
  renderTarget: (onClick: () => void) => ReactNode;
}

export const BookmarkModal: FC<BookmarkModalProps> = ({
  title,
  initialValues,
  onSubmit,
  renderTarget,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<BookmarkFormValues>({
    mode: 'uncontrolled',
    initialValues,
    validateInputOnBlur: true,
    validate: {
      title: isNotEmpty('Введите название заметки'),
      url: matches(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
        'Неверный формат URL',
      ),
    },
  });

  const handleSubmit = (values: BookmarkFormValues) => {
    onSubmit(values);
    form.reset();
    close();
  };

  return (
    <div>
      <Modal
        classNames={{ content: classes.modalContent }}
        opened={opened}
        onClose={close}
        title={<div>{title}</div>}
      >
        <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
          <Stack>
            <TextInput {...form.getInputProps('title')} placeholder="Введите название..." />
            <TextInput {...form.getInputProps('url')} placeholder="Введите url..." />
          </Stack>

          <Button radius={8} mt={16} type="submit" color="black" fullWidth>
            Добавить
          </Button>
        </form>
      </Modal>

      {renderTarget(open)}
    </div>
  );
};
