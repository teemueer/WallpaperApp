import { Card, Text } from "@rneui/base";
import { baseUrl } from "../utils/config";

import {useFonts} from 'expo-font'
import { Nunito_700Bold_Italic  } from '@expo-google-fonts/nunito'
import { Karla_400Regular } from '@expo-google-fonts/karla'
import {styles} from '../styles/Single.style'

const Single = ({ route }) => {
  console.log(route.params);
  const { filename, title, thumbnails, time_added } =
    route.params.media;

    const [fontsLoaded] = useFonts({
      Nunito_700Bold_Italic,
      Karla_400Regular
    })

    if(!fontsLoaded){
      return null;
    }

    

  return (
    <Card>
      <Card.Image
        style={{ width: "100%", height: undefined, aspectRatio: 1 }}
        source={{
          uri: `${baseUrl}/uploads/${thumbnails.w160}`,
        }}
      ></Card.Image>
      <Text h1 >Hello</Text>
      <Text h1 style={{fontFamily:'Karla_400Regular'}}>Hello</Text>
      <Text h1 style={{fontFamily:'Nunito_700Bold_Italic'}}>Hello</Text>
    </Card>
  );

};

export default Single;
