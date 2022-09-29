import {SafeAreaView} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';


const Home = (props) => {
  const {navigation} = props;
  return (
      <SafeAreaView>
        <List navigation={navigation}/>
      </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
