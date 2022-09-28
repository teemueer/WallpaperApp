
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/base';
import { baseUrl } from '../utils/config';

const ListItem = ({singleMedia}) =>{

    return(
        <RNEListItem
        bottomDivider
        >
            <Avatar
            size="medium"
            source={{
                uri: `${baseUrl}/uploads/${singleMedia.item.thumbnails.w160}`
            }}
            ></Avatar>
        </RNEListItem>
    );
}

export default ListItem;