import {ref,onMounted} from 'vue'
import {ItemType,AddType,FetchType,EditType,DeleteType} from '@/types';

export const composistionApi = (
  fechApi: FetchType,
  deleteApi: DeleteType,
  confirmAddApi: AddType,
  confirmEditApi: EditType,
  itemData: ItemType,
) => {
  const currentIndex = ref<Number|null>(null);
  const list = ref([{}]);
  const getList = () => {
    fechApi().then((res:any) => {
      list.value = res.data.list;
    });
  };
  const addItem = () =>{
    list.value.unshift(itemData);
    currentIndex.value = 0;
  };
  const editItem = (index:number) =>{
    currentIndex.value = index;
  };
  const deleteItem = (index:number,item:ItemType) =>{
    deleteApi(item).then(()=>{
      list.value.splice(index,1);
    });
  };
  const cancel = (item:ItemType) =>{
    currentIndex.value = null;
    if (!item.Id){
      list.value.splice(0,1);
    }
  };
  const confirm = (item:ItemType) =>{
    const api = item.id?confirmEditApi : confirmAddApi;
    api(item).then(()=>{
      getList();
      cancel(item);
    });
  };
  onMounted(()=>{
    getList();
  });
  return {
    list,
    currentIndex,
    getList,
    addItem,
    editItem,
    deleteItem,
    cancel,
    confirm
  };
};
export default composistionApi;
