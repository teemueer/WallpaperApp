import { Card, Text } from "@rneui/base";
import { baseUrl } from "../utils/config";

const Single = ({ route }) => {
  const { description, filename, title, thumbnails, time_added } =
    route.params.file;
  return (
    <Card>
      <Card.Image
        style={{ width: "100%", height: undefined, aspectRatio: 1 }}
        source={{
          uri: `${baseUrl}/uploads/${thumbnails.w160}`,
        }}
      ></Card.Image>
    </Card>
  );
};

export default Single;
