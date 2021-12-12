import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {TaskType} from '../constants/dataTSTypes';
import moment from 'moment';
import {layout} from '../constants';
import services from '../services';
type DataType = {
  task: TaskType;
  handleRefresh: () => void;
};

const TaskItem = (props: DataType): JSX.Element => {
  const {task, handleRefresh} = props;
  const [content, setContent] = useState<string>(task.content);
  const inputRef = useRef<TextInput>(null);
  const [showModal, setShowModal] = useState(false);
  const updateContent = async () => {
    await services.updateTask(task.id.toString(), {content});
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const updateStatus = async (stt: number) => {
    await services.updateTask(task.id.toString(), {
      status: stt,
    });
    handleRefresh();
  };
  const removeTask = async () => {
    await services.removeTask(task.id.toString());
    handleRefresh();
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity onLongPress={toggleModal}>
        <Text style={{color: 'grey'}}>
          {moment(props.task.createdAt).format('DD/MM/YYYY')}
        </Text>
        <TextInput
          ref={inputRef}
          value={content}
          onChangeText={setContent}
          multiline
          style={{
            fontSize: 20,
            width: layout.window.width - 70,
          }}
          onSubmitEditing={updateContent}
          onBlur={updateContent}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={toggleModal}>
        <View style={styles.wrapModal}>
          <View style={styles.wrapHeader}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>Tác vụ</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.btnClose}>
              <Text>x</Text>
            </TouchableOpacity>
          </View>

          {task.status !== 1 && (
            <TouchableOpacity
              style={styles.itemMethod}
              onPress={() => updateStatus(1)}>
              <Text>Open</Text>
            </TouchableOpacity>
          )}

          {task.status !== 2 && (
            <TouchableOpacity
              style={styles.itemMethod}
              onPress={() => updateStatus(2)}>
              <Text>In progress</Text>
            </TouchableOpacity>
          )}

          {task.status !== 3 && (
            <TouchableOpacity
              style={styles.itemMethod}
              onPress={() => updateStatus(3)}>
              <Text>Done</Text>
            </TouchableOpacity>
          )}
          {task.status !== -1 && (
            <TouchableOpacity
              style={styles.itemMethod}
              onPress={() => updateStatus(-1)}>
              <Text>Draft</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.itemMethod} onPress={removeTask}>
            <Text style={{color: 'red'}}>Remove</Text>
          </TouchableOpacity>
          <View style={{height: 30}} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    maxWidth: '80%',
  },
  itemMethod: {
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  wrapModal: {
    width: layout.window.width,
    maxHeight: layout.window.height * 0.5,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    ...layout.cardShadow,
  },
  wrapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  btnClose: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEEEEE',
    alignSelf: 'flex-end',
    marginVertical: 3,
  },
});

export default TaskItem;
