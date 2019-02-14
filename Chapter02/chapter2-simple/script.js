// Global Vue Filter
Vue.filter('date', time => moment(time).format('YYYY/MM/DD,HH:mm'));

// New VueJS instance
new Vue({
    name: 'notebook',

    // CSS selector of the root DOM element
    el: '#notebook',

    // Some data
    data() {
        return {
            // content: 'This is a note', // 内容
            notes: JSON.parse(localStorage.getItem('notes')) || [], // 笔记列表
            selectedId: localStorage.getItem('selected-id') || null // 当前选中笔记的id
            // content: localStorage.getItem('content') || 'You can write in **markdown**',
        }
    },

    // Computed properties
    computed: {
        notePreview() {
            // Markdown rendered to HTML
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
        addButtonTitle() {
            return this.notes.length + ' note(s) already'
        },
        selectedNote() {
            return this.notes.find(note => note.id === this.selectedId)
        },
        sortedNotes() {
            return this.notes.slice().sort((a, b) => a.created - b.created).sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
        },
        // 行数
        linesCount() {
            if (this.selectedNote) {
                // 计算换行符的个数
                // \r 回车 \n 换行
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },
        // 单词数 两个单词之间隔着一个空格
        wordsCount() {
            if (this.selectedNote) {
                let s = this.selectedNote.content;
                // 将换行符转为空格
                s = s.replace(/\n/g, ' ');
                // 排除开头和结尾的空格
                s = s.replace(/^ +| +$/g, '');
                // 将多个空格转为一个
                s = s.replace(/\s+/g,' ');
                // 返回按照空格拆分后数量(split拆分后是数组，获取数组的长度即可)
                return s.split(' ').length
            }
        },
        // 字符数 计算空格
        charactersCount(){
            if(this.selectedNote){
                return this.selectedNote.content.split('').length
            }
        }
    },

    // Change watchers
    watch: {
        notes: {
            // 方法名
            handler: 'saveNotes',
            // 需要使用这个选项来侦听数组中每个笔记属性的变化
            deep: true
        },
        selectedId(val) {
            localStorage.setItem('selected-id', val)
        }
    },

    methods: {
        // 自动存储笔记到localStorage
        /*
        saveNote() {
            console.log('saving note', this.content);
            localStorage.setItem('content', this.content);
        },
        */
        // 自动将所有的笔记存到localstorage中
        saveNotes() {
            // 在存储前要先将数组转换为字符串
            localStorage.setItem('notes', JSON.stringify(this.notes));
            console.log('Notes saved!', new Date())
        },
        // 增加一条笔记到notes中
        addNote() {
            const time = Date.now();
            // 新笔记的默认值
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: `**Hi** This notebook${this.notes.length + 1} is using [baidu](https://www.baidu.com) for formatting!`,
                created: time,
                favorite: false
            };
            this.notes.push(note);
            console.log(this.notes);
        },
        // 选中当前笔记，修改当前选中的selectedId
        selectNote(note) {
            this.selectedId = note.id;
            console.log('selectedId:', this.selectedId);
        },
        // 删除当前笔记
        removeNote() {
            if (this.selectNote && confirm('Delete the note')) {
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },
        // 给当前笔记增加收藏
        favoriteNote() {
            this.selectedNote.favorite ^= true;
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