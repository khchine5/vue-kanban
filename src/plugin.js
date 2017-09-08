import Kanban from './components/Kanban.vue';

const KanbanPlugin = {
  install: function(Vue, options) {
    Vue.component(Kanban.name, Kanban);
  },
};

export default KanbanPlugin;
export {
  Kanban as VueKanban
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(KanbanPlugin);
}
