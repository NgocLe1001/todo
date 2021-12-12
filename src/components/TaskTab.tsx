import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import Tasks from './Tasks';
import {colors, layout} from '../constants';
import {RouteType} from '../constants/dataTSTypes';
import services from '../services';

export default function TaskTab() {
  const [index, setIndex] = useState<number>(0);
  const [newTask, setNewTask] = useState<string>('');

  const [routes] = useState<RouteType[]>([
    {key: 'open', title: 'Open', status: 1},
    {key: 'inProgress', title: 'In Progress', status: 2},
    {key: 'done', title: 'Done', status: 3},
    {key: 'draft', title: 'Draft', status: -1},
  ]);
  const renderScene = ({route}: {route: RouteType}) => {
    switch (route.key) {
      case 'open':
        return <Tasks route={route} />;
      case 'inProgress':
        return <Tasks route={route} />;
      case 'done':
        return <Tasks route={route} />;
      case 'draft':
        return <Tasks route={route} />;
      default:
        return null;
    }
  };

  const addTask = async () => {
    if (!newTask) {
      return Alert.alert('Error', 'Please fill required field!');
    }
    await services.createTask({
      id: Math.random(),
      status: 1,
      createdAt: new Date().getTime(),
      content: newTask,
    });
    setNewTask('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <TabView
          renderTabBar={props => (
            <TabBar
              scrollEnabled={true}
              {...props}
              pressOpacity={0.1}
              pressColor={colors.Primary}
              activeColor={colors.Primary}
              style={{backgroundColor: 'transparent'}}
              inactiveColor={'grey'}
              indicatorStyle={{backgroundColor: colors.Primary}}
              tabStyle={{width: layout.window.width / routes.length}}
              renderLabel={(payload: {
                focused: boolean;
                route: {title: string};
              }) => {
                return (
                  <Text
                    style={{color: payload.focused ? colors.Primary : '#000'}}>
                    {payload.route.title}
                  </Text>
                );
              }}
            />
          )}
          navigationState={{index, routes: routes.filter(item => item.status)}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.window.width}}
          lazy
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder={'Write a task'}
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity onPress={addTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: layout.window.width * 0.65,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
  },
});
