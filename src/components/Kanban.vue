<template>
    <div class="drag-container">
    	<ul class="drag-list">
    		<li v-for="stage in stages" class="drag-column" :class="{['drag-column-' + stage]: true}">
    			<span class="drag-column-header">
    				<h2>{{ stage }}</h2>
    			</span>
    			<div class="drag-options"></div>
    			<ul class="drag-inner-list" ref="list" :data-status="stage">
                    <li class="drag-item" v-for="block in getBlocks(stage)" :data-block-id="block.id" :key="block.id">
                        <slot :name="block.id">
                            <strong>{{ block.status }}</strong>
                            <div>{{ block.id }}</div>
                        </slot>
                    </li>
    			</ul>
    		</li>
    	</ul>
    </div>
</template>

<script>
    import dragula from 'dragula';

    export default {
      name: 'KanbanBoard',

      props: {
        stages: {},
        blocks: {},
      },

      computed: {
        localBlocks() {
          return this.blocks;
        },
      },

      methods: {
        getBlocks(status) {
          return this.localBlocks.filter(block => block.status === status);
        },
      },

      mounted() {
        dragula(this.$refs.list)
            .on('drag', (el) => {
              el.classList.add('is-moving');
            })
            .on('drop', (block, list) => {
              this.$emit('update-block', block.dataset.blockId, list.dataset.status);
            })
            .on('dragend', (el) => {
              el.classList.remove('is-moving');

              window.setTimeout(() => {
                el.classList.add('is-moved');
                window.setTimeout(() => {
                  el.classList.remove('is-moved');
                }, 600);
              }, 100);
            });
      },
    };
</script>
<style lang="scss">
  @import '../assets/kanban.scss';
  $on-hold: #FB7D44;
  $in-progress: #2A92BF;
  $needs-review: #F4CE46;
  $approved: #00B961;

  * {
    box-sizing: border-box;
  }

  body {
    background: #33363D;
    color: white;
    font-family: 'Lato';
    font-weight: 300;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  .drag-column {
    &-on-hold {
      .drag-column-header,
      .is-moved,
      .drag-options {
        background: $on-hold;
      }
    }

    &-in-progress {
      .drag-column-header,
      .is-moved,
      .drag-options {
        background: $in-progress;
      }
    }

    &-needs-review {
      .drag-column-header,
      .is-moved,
      .drag-options{
        background: $needs-review;
      }
    }

    &-approved {
      .drag-column-header,
      .is-moved,
      .drag-options {
        background: $approved;
      }
    }
  }

  .section {
    padding: 20px;
    text-align: center;

    a {
      color: white;
      text-decoration: none;
      font-weight: 300;
    }

    h4 {
      font-weight: 400;
      a {
        font-weight: 600;
      }
    }
  }
</style>
