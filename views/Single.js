import { Card } from "@rneui/base";

const Single = ({ route }) => {
  const { media } = route.params;

  console.log(media);

  return (
    <Card>
      <Card.Title>Single</Card.Title>
    </Card>
  );
};

export default Single;
