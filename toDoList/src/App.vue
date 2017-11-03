<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1 v-text="title"></h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{Finished:item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'

  export default {
    data: function () {
      return {
        title: 'this is a todo list',
        items:[
        ],
        newItem: ''
      }
    },
    methods:{
      toggleFinish:function(item){
        item.isFinished= !item.isFinished;
        //console.log(item.isFinished)
      },
      addNew:function(){
        this.items.push({
          label: this.newItem,
          isFinished: false
        })
        //console.log(this.newItem);
        this.newItem=''
      }
    }
  }
</script>

<style>
.Finished{
  text-decoration: underline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
