(function(a,b){a(["jquery","underscore","backbone","collections/col_general"],function(a,c,d,e){var f={},g,h,i,j;g=d.Model.extend({initialize:function(a,b){b.dir&&this.set({dir:b.dir},{silent:!0}),this.set({id:c.uniqueId()},{silent:!0})}}),h=d.Collection.extend({model:g,getByFileName:function(a){a=c.isArray(a)?a:a.split();return c.filter(this.models,function(b){return c.indexOf(a,b.get("path"))>=0})}}),i=function(){function j(a){var b=this,d=b.get("subdirs");d&&c.each(d,function(b){a.push(b),j.call(b,a)})}function i(a,b,d,e){var f;b===this&&(f=this.get("files"),f&&f.remove(f.models),this.get("subdirs")&&c.each(this.get("subdirs"),function(b){g.call(b,!1,a,e)}))}function g(a,b,d){d=d||{},b=this.collection||b,b.remove(this,c.extend(d,{silent:a}))}function f(){var a=this.get("parent");!a||a.get("subdirs").push(this)}function e(){var a;!this.get("_parent")||(a=this.collection.get(this.get("_parent")),this.set("parent",a)),this.collection.off("add reset",this._setParent),delete this._setParent}function b(a,b){a.set("level",b&&b.get("level")+1||0)}function a(){this.collection.setSchemeState(this)}return d.Model.extend({defaults:{name:"",_parent:null,path:null,state:"close"},initialize:function(b,d){var e=this;this.collection.on("remove",c.bind(i,this,this.collection)),this.on("change:state",c.bind(a,this)),this.on("change:parent",c.bind(f,this)),this.set("state",this.collection.getSchemeStateByPath(this))},parse:function(a){var b;a.files&&c.isArray(a.files)&&(b=new h,b.add(a.files,{dir:this}),a.files=b);return a},getSubDirs:function(a){var b=a?[this]:[];j.call(this,b);return b},getByFileName:function(a){return this.get("files")?this.get("files").getByFileName(a):[]}})}(),j=function(){function k(a){return!!f[a]}function j(a,b){var c,d=a.getSubDirs(!0);b.directory._parent=a.get("_parent"),b.directory.id=a.id,b.directory.cid=a.cid,this.remove(d,{silent:!0}),c=this.parse(b),this.add(c,{parse:!0}),this.trigger("update",this.get(a.id))}function h(b,d){d=d||{},d.success=d.success||function(){},d.error=d.error||function(){};return a.ajax({type:"GET",url:this.url,dataType:"json",data:c.extend({field_id:this.settings.field_id},b),success:d.success,error:d.error})}function g(a,b,d){var e=this,f,h;if(a.directory)return g.call(this,a.directory,b);f=a.id?a.id:"dir"+c.uniqueId(),a._parent=a._parent,a.id=f,b.push(a);if(a.subdirs)while(a.subdirs.length)h=a.subdirs.shift(),h.directory._parent=f,g.call(this,h,b);return b}function d(){var a;f[this.cid]||(a=f[this.cid]={},c.each(this.models,function(b){a[b.get("path")]={state:"close"}}))}return e.extend({url:b.Context.get("root")+"/symphony/extension/filemanager/listing/",model:i,initialize:function(){this.cid=this.cid||"c"+c.uniqueId(),this.on("reset",function(){}),this.on("add",function(){})},populate:function(){this.deferred=this.fetch({data:{field_id:this.settings.field_id||0}}),this.deferred.done(c.bind(d,this))},parse:function(a){var b=this,d=g.call(this,a,[]),e=c.map(d,function(a){a=new i(a,{collection:b,parse:!0});return a});c.each(e,function(a){var b=a.get("_parent"),d=c.find(e,function(a){return a.get("id")===b});a.set({parent:d})});return e},setScheme:function(a){f[this.cid]=a;return this},changeScheme:function(){k(this.cid)||d.call(this)},setSchemeState:function(a,b){var c=a.get("path");f[this.cid][c]&&(f[this.cid][c].state=a.get("state")?a.get("state"):"close")},getSchemeStateByPath:function(a){return k(this.cid)&&f[this.cid][a.get("path")]?f[this.cid][a.get("path")].state:"close"},getFile:function(a,b){var d=this.getFiles(b),e;if(!c.isArray(d))return d.get(a);e=c.find(d,function(b){return b.get(a)});return e},getFiles:function(a){return a?this.get(a).get("files"):this.pluck("files")},getFileById:function(a){a=parseInt(a,10);var b=this.getFiles(),d=c.find(b,function(b){return b.get(a)});return d.get(a)},getByFileName:function(a){var b=this.getFiles(),d=[];c.isArray(a)||(a=a.split(" ")),c.each(b,function(b){if(b){var e=c.filter(b.models,function(b){return c.include(a,b.attributes.path)});e.length&&d.push(e)}});return c.flatten(d)},updateDir:function(a){h.call(this,{select:a.get("path")}).done(c.bind(j,this,a)).fail()},createDir:function(b,d){d=this.get(d.id)||undefined;if(!d)return!1;var e=this.url.replace(/listing\/$/,"edit/"),f={mkdir:b,within:d.get("path"),type:"create"};return a.ajax({url:e,type:"post",data:f,dataType:"json",success:c.bind(this.updateDir,this,d)})},moveItem:function(b){var c=this,d=this.get(b.source),e=this.get(b.destination),f=b.file?this.getFile(b.file,d.id):d,g={from:f.get("path"),to:e.get("path"),type:"move",dataType:b.type},h=this.url.replace(/listing\/$/,"edit/");return a.ajax({url:h,type:"post",data:g,dataType:"json",success:function(){b.type==="file"?f.collection.remove(f):c.remove(d),c.updateDir(e)},error:function(){}})},deleteItem:function(b,c){var d=this.url.replace(/listing\/$/,"edit/"),e=this;return a.ajax({url:d,type:"post",data:{type:"delete",file:b.get("path")},dataType:"json",success:function(){c!=="file"?e.remove(b):b.collection.remove(b),e.trigger("itemdelete",b.get("id"),c)},error:function(){}})}})}();return j})})(this.define,this.Symphony)