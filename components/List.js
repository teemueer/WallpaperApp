
import {FlatList} from 'react-native';
import fetchUserMedia from '../hooks/MediaApi';
import ListItem from './ListItem';
import MasonryList from '@react-native-seoul/masonry-list';




const List = ({mediaToggle = false}) => {
    const {userMedia} = fetchUserMedia(mediaToggle);
    return(
        <MasonryList
            data={userMedia}
            numColumns={2}
            renderItem={(item) => <ListItem 
            singleMedia={item.item}
            />}
        />
    );
}

export default List;