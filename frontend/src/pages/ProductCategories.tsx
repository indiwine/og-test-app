import Grid from '@mui/material/Grid2';
import { PageContainer } from '../components/PageContainer/PageContainer.tsx';
import { ProductCategoryCard } from '../components/ProductCategoryCard/ProductCategoryCard.tsx';
import { gql, TypedDocumentNode, useQuery } from '@apollo/client';

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


const gridItemSize = 'grow';

export function ProductCategories() {
  const {loading, error, data} = useQuery(GET_PRODUCT_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);


  return (
    <PageContainer title="Product Categories">
      <Grid container spacing={1}>
        {data?.findProductCategories.map((category) => (
          <Grid size={gridItemSize} key={category.id}>
            <ProductCategoryCard name={category.name}/>
          </Grid>
        ))}
      </Grid>

    </PageContainer>
  );
}
