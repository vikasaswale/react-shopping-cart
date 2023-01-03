
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

function Cards({ handleClick, textValue, data, isHome, handleDelete,handleEdit }) {
  return (
    <Grid item sm={4} md={3} lg={3}>
      <Card >
        <CardMedia
          sx={{ height: 140 }}
          image={data.images}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.price}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button variant="contained"  color="primary" onClick={() => { handleClick(data.id) }}>{textValue}</Button>
          {
            isHome
              ?
              <>
                <Button variant="contained" color="secondary" onClick={() => { handleEdit(data.id) }}>Edit</Button>
                <Button variant="contained" color="error" onClick={() => { handleDelete(data.id) }}>Delete</Button>
              </>

              : null
          }

        </CardActions>
      </Card>
    </Grid>
  );
}

export default Cards;
