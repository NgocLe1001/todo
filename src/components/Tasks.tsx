import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList} from 'react-native';

import services from '../services';
import TaskItem from './TaskItem';
import {TaskType, RouteType} from '../constants/dataTSTypes';
import {layout} from '../constants';

type dataType = {
  route: RouteType;
};
type itemType = {
  item: TaskType;
  index: number;
};
export default function Task(props: dataType) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getTasks();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);

    setTasks([]);
    getTasks();
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      let rs = await services.getTask();
      setLoading(false);
      setRefreshing(false);
      if (rs?.status !== 200) {
        return;
      }
      let temp = rs.data.filter(
        (item: TaskType) => item.status === props.route.status,
      );
      setTasks(temp);
    } catch (e) {
      setLoading(false);
      // error reading value
    }
  };
  const renderItem = ({item, index}: itemType) => {
    return (
      <View key={index}>
        <TaskItem task={item} handleRefresh={() => onRefresh()} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: layout.window.height * 0.5}}
          data={tasks}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={renderItem}
          keyExtractor={(item: any, index: number) => index.toString()}
          ListFooterComponent={
            loading ? (
              <View>
                <View style={styles.fakeItem} />
                <View style={styles.fakeItem} />
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  fakeItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    height: 60,
  },
});
