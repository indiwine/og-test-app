import Grid from '@mui/material/Grid2';
import { PageContainer } from '../components/PageContainer/PageContainer.tsx';
import { ProductCategoryCard } from '../components/ProductCategoryCard/ProductCategoryCard.tsx';
import { gql, TypedDocumentNode, useQuery } from '@apollo/client';
import { BottomDial, BottomDialActionProps } from '../components/Ui/BottomDial/BottomDial.tsx';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useRef } from 'react';
import { ProductCategoryModal } from '../components/ProductCategoryModal/ProductCategoryModal.tsx';
import { CustomModalActionsRef } from '../components/Ui/Modal/CustomModal.tsx';

type ProductCategory = {
  id: string;
  name: string;
};

type ProductCategoriesData = {
  findProductCategories: ProductCategory[];
}

const GET_PRODUCT_CATEGORIES: TypedDocumentNode<ProductCategoriesData> = gql`
    query GetProductCategories {
        findProductCategories(condition: null) {
            id, name
        }
    }
`;


export function ProductCategories() {
  const {loading, error, data, refetch} = useQuery(GET_PRODUCT_CATEGORIES);
  const modalRef = useRef<CustomModalActionsRef>(null);


  const dialActions: BottomDialActionProps[] = [
    {
      name: 'Add Category',
      icon: <NoteAddOutlinedIcon/>,
      onClick: () => {
        console.log('Add Category')
        if (modalRef.current) {
          modalRef.current.open()
        }
      }
    },
    {
      name: 'Refresh',
      icon: <RefreshOutlinedIcon/>,
      onClick: () => {
        refetch()
      }
    }
  ]

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  return (
    <>
      <ProductCategoryModal ref={modalRef}/>
      <PageContainer title="Product Categories">
        <Grid container spacing={1}>
          {data?.findProductCategories.map((category) => (
            <Grid size="grow" key={category.id}>
              <ProductCategoryCard name={category.name}/>
            </Grid>
          ))}
        </Grid>

      </PageContainer>
      <BottomDial actions={dialActions}/>
    </>

  );
}
