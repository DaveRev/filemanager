(function(a,b,c,d){function f(){d.Context.get("root")?e(d.Context.get("root")):setTimeout(function(){f()},5)}function e(a){b({baseUrl:a+"/extensions/filemanager/assets/js",paths:{jquery:"libs/jquery",jqueryui:"libs/jquery-ui-1.8.18.custom",underscore:"../../../sym_backbonejs/assets/underscore",backbone:"../../../sym_backbonejs/assets/backbone",text:"../../../sym_requirejs/assets/text"}},["main"])}f()})(this,this.require,this.define,this.Symphony)