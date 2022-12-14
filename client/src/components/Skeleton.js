import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

const Media = () => {
  return (
    <Card className='card' width='80%'>
      <CardHeader
        sx={{ backgroundColor: '#a9def9' }}
        avatar={<Skeleton animation='wave' variant='circular' width={40} height={40} />}
        action={null}
        title={
          <Skeleton
            animation='wave'
            height={10}
            width='80%'
            style={{ marginBottom: 6 }}
          />
        }
        subheader={
          <Skeleton animation='wave' height={10} width='40%' />
        }
      />
      <Skeleton sx={{ height: 250 }} animation='wave' variant='rectangular' />
      <CardContent>
        <>
          <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
          <Skeleton animation='wave' height={10} width='70%' style={{ marginBottom: 6 }} />
          <Skeleton animation='wave' height={10} width='50%' />
        </>
      </CardContent>
    </Card>
  );
};

export default Media;
