
import {Text} from '@rneui/base';
import {FlatList} from 'react-native';
import fetchUserMedia from '../hooks/MediaApi';
import ListItem from './ListItem';



const List = ({mediaToggle = false}) => {
    const {userMedia} = fetchUserMedia(mediaToggle);
    return(
        <FlatList
            data={userMedia}
            renderItem={(item) => <ListItem 
            singleMedia={item}
            />}
        />
    );
}

export default List;