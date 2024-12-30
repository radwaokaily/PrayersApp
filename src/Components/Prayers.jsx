import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line react/prop-types
export const Prayers = ({prayerName,time,img}) => {
    return (
        <div>

        <Card sx={{ width: 200}} >
          <CardMedia
            sx={{ height: 140 }}
            image={img}
            title="green iguana"
          />
          <CardContent style={{textAlign:"center"}}>
            <h3>
              {prayerName}
            </h3>
            <Typography variant='h4'sx={{ color: 'text.secondary' }}>
              {time}
            </Typography>
          </CardContent>
        </Card>
        </div>
      );
}

