import engine from 'store/src/store-engine';
import localStorage from 'store/storages/localStorage';
import cookieStorage from 'store/storages/cookieStorage';
import expire from 'store/plugins/expire';

const store = engine.createStore([
  localStorage,
  cookieStorage,
], [
  expire,
]);

export default store;
