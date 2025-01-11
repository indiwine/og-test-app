import { Button, Card, CardActions, CardContent } from '@mui/material';

interface ProductCategoryCardProps {
  name: string;
}

export function ProductCategoryCard({name}: ProductCategoryCardProps) {
  return (
    <Card>
      <CardContent>
        {name}
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}
