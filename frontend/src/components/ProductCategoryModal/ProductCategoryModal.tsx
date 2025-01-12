import { forwardRef } from 'react';
import { CustomModal, CustomModalForwardRef } from '../Ui/Modal/CustomModal.tsx';
import { ModalTitle } from '../Ui/Modal/ModalTitle.tsx';



export const ProductCategoryModal = forwardRef((_props, ref: CustomModalForwardRef) => {
  return (
    <CustomModal ref={ref}>
      <ModalTitle>Add product category</ModalTitle>
    </CustomModal>
  );
})
