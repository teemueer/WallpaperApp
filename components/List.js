import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/useMedia';
import PropTypes from 'prop-types';



const List = ({navigation}) => {

  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);

  return (
      <FlatList
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
              <ListItem
                  singleMedia={item}
                  navigation={navigation}
              />
          )}
      />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;