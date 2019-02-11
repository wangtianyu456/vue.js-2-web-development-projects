// New VueJS instance
new Vue({
    name: 'notebook',

    // CSS selector of the root DOM element
    el: '#notebook',

    // Some data
    data() {
        return {
            content: 'This is a note',
            notes: []
            // content: localStorage.getItem('content') || 'You can write in **markdown**',
        }
    },

    // Computed properties
    computed: {
        notePreview() {
            // Markdown rendered to HTML
            return marked(this.content);
        },
    },

    // Change watchers
    watch: {
        /*content: {
          handler (val, oldVal) {
            console.log('new note:', val, 'old note:', oldVal)
            localStorage.setItem('content', val)
          },
          immediate: true,
        },*/

        /*content (val) {
          localStorage.setItem('content', val)
        },*/

        /*content: {
          handler: 'saveNote',
        },*/

        //content: 'saveNote',

        // 侦听content数据属性
        content: {
            handler: 'saveNote'
        }
    },

    methods: {
        saveNote() {
            console.log('saving note', this.content);
            localStorage.setItem('content', this.content);
        },
        addNote() {
            const time = Date.now();
            // 新笔记的默认值
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content:'**Hi** This notebook is using [baidu](https://www.baidu.com) for formatting!',
                created:time,
                favorite:false
            };
            this.notes.push(note);
            console.log(this.notes);
        }
    },

    /* created () {
      this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    }, */
    created() {
        this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    }
});
console.log('restored note', localStorage.getItem('content'));