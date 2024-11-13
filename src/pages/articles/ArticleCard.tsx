import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

interface ArticleCardProps {
  title: string;
  content: string;
  imageUrl?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  content,
  imageUrl,
}) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      {imageUrl && (
        <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
