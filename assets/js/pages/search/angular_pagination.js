app.directive("uibPagination",["$parse","uibPaginationConfig",function(e,i){return{scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@",ngDisabled:"="},require:["uibPagination","?ngModel"],restrict:"A",controller:"UibPaginationController",controllerAs:"pagination",template:'<li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href class="pagination-nav" ng-click="selectPage(1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText("first")}}</a></li><li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href class="pagination-nav" ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText("previous")}}</a></li><li role="menuitem" ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)" ng-disabled="ngDisabled&&!page.active" uib-tabindex-toggle>{{page.text}}</a></li><li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href class="pagination-nav" ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText("next")}}</a></li><li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href class="pagination-nav" ng-click="selectPage(totalPages, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText("last")}}</a></li>',link:function(e,a,n,t){a.addClass("pagination");a=t[0],t=t[1];t&&a.init(t,i)}}}]).controller("UibPaginationController",["$scope","$attrs","$parse","uibPaging","uibPaginationConfig",function(l,e,a,n,o){var t=this,u=(angular.isDefined(l.$parent.maxSize)?l.$parent:o).maxSize,c=((angular.isDefined(o.currentPage)?o:l.$parent).currentPage,(angular.isDefined(l.$parent.rotate)?l.$parent:o).rotate),d=(angular.isDefined(l.$parent.forceEllipses)?l.$parent:o).forceEllipses,p=(angular.isDefined(l.$parent.boundaryLinkNumbers)?l.$parent:o).boundaryLinkNumbers,f=angular.isDefined(l.$parent.pageLabel)?function(e){return l.$parent.pageLabel,{$page:e}}:angular.identity;function P(e,a,n){return{number:e,text:a,active:n}}l.boundaryLinks=(angular.isDefined(l.$parent.boundaryLinks)?l.$parent:o).boundaryLinks,l.directionLinks=(angular.isDefined(l.$parent.directionLinks)?l.$parent:o).directionLinks,e.$set("role","menu"),n.create(this,l,e),e.maxSize&&t._watchers.push(l.$parent.$watch(a(e.maxSize),function(e){u=parseInt(e,10),t.render()}));var i=this.render;this.render=function(){i(),0<l.page&&l.page<=l.totalPages&&(l.pages=function(e,a){var n=[],t=1,i=a,r=(angular.isDefined(l.$parent.maxSize)?l.$parent:o).maxSize&&u<a;r&&(c?a<(i=(t=Math.max(e-Math.floor(u/2),1))+u-1)&&(t=(i=a)-u+1):(t=(Math.ceil(e/u)-1)*u+1,i=Math.min(t+u-1,a)));for(var s=t;s<=i;s++){var g=P(s,f(s),s===e);n.push(g)}return r&&0<u&&(!c||d||p)&&(1<t&&((!p||3<t)&&(r=P(t-1,"...",!1),n.unshift(r)),p&&(3===t&&(r=P(2,"2",!1),n.unshift(r)),t=P(1,"1",!1),n.unshift(t))),i<a&&((!p||i<a-2)&&(r=P(i+1,"...",!1),n.push(r)),p&&(i===a-2&&(t=P(a-1,a-1,!1),n.push(t)),r=P(a,a,!1),n.push(r)))),n}(l.page,l.totalPages))}}]).factory("uibPaging",["$parse","uibPaginationConfig",function(e,a){return{create:function(n,t,i){n.setNumPages=i.numPages?e(i.numPages).assign:angular.noop,n.ngModelCtrl={$setViewValue:angular.noop},n._watchers=[],n.init=function(e,a){n.ngModelCtrl=e,n.config=a,e.$render=function(){n.render()},i.itemsPerPage?n._watchers.push(t.$parent.$watch(i.itemsPerPage,function(e){n.itemsPerPage=parseInt(e,10),t.totalPages=n.calculateTotalPages(),n.updatePage()})):n.itemsPerPage=a.itemsPerPage,t.$watch("totalItems",function(e,a){!angular.isDefined(e)&&e===a||(n.config.currentPage&&(n.ngModelCtrl.$setViewValue(parseInt(n.config.currentPage)),n.config.currentPage=""),t.totalPages=n.calculateTotalPages(),n.updatePage())})},n.calculateTotalPages=function(){var e=n.itemsPerPage<1?1:Math.ceil(t.totalItems/n.itemsPerPage);return Math.max(e||0,1)},n.render=function(){t.page=parseInt(n.ngModelCtrl.$viewValue,10)||1},t.selectPage=function(e,a){a&&a.preventDefault(),(!t.ngDisabled||!a)&&t.page!==e&&0<e&&e<=t.totalPages&&(a&&a.target&&a.target.blur(),n.ngModelCtrl.$setViewValue(e),t.$parent.search_result(e),n.ngModelCtrl.$render())},t.getText=function(e){return t[e+"Text"]||n.config[e+"Text"]},t.noPrevious=function(){return 1===t.page},t.noNext=function(){return t.page===t.totalPages},n.updatePage=function(){n.setNumPages(t.$parent,t.totalPages),t.page>t.totalPages?t.selectPage(t.totalPages):n.ngModelCtrl.$render()},t.$on("$destroy",function(){for(;n._watchers.length;)n._watchers.shift()()})}}}]);