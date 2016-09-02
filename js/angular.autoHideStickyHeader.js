!function() {
  'use strict';

  angular.module('angular.autoHideStickyHeader', [])
    .directive('autoHideStickyHeader', ['$document', '$window', 'throttle', directive]);


  function directive($document, $window, throttle) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        cssClassHidden: '@?',
        showAtBottom: '@?'
      },
      transclude: true,
      template: '<nav class="auto-hide-sticky-header navbar navbar-inverse navbar-fixed-top" role="navigation" ng-transclude></nav>',
      link: link
    };

    function link(scope, element) {
      var options = {
        cssClassHidden: scope.cssClassHidden || 'auto-hide-sticky-header-hidden',
        showAtBottom: scope.showAtBottom ? scope.showAtBottom === 'true' : true
      };

      var onChange = getOnChange(element, options);
      var scrolling = new Scrolling($document, $window, options, onChange);

      var handle = throttle(angular.bind(scrolling, scrolling.handle), 250);
      var $el = angular.element($window).on('scroll', handle);

      scope.$on('destroy', function() {
        $el.off('scroll', handle);
      });
      $(document).ready(function($) {
              $('.toggle-menu').jPushMenu();
          });
    }

    function getOnChange(element, options) {
      return function change(hidden) {
        element.toggleClass(options.cssClassHidden, hidden);
      }
    }
  }


  function Scrolling($document /* angular.IDocumentService */, $window /* angular.IWindowService */, options, change /* (boolean) => void */) {
    this.$document = $document;
    this.$window = $window;

    this.options = options;
    this.change = change;

    this.dHeight = 0;
    this.wHeight = 0;
    this.current = 0;
    this.previous = 0;
    this.diff = 0;
  }

  angular.extend(Scrolling.prototype, {

    atBottom: function() /* boolean */ {
      return (this.current + this.wHeight) >= this.dHeight;
    },

    down: function() /* boolean */ {
      return this.diff < 0;
    },

    handle: function() /* void */ {
      var hidden = false;
      var scrolling = this.update();
      if(this.current >= 1) {
        if (scrolling.down()) {
          if (this.options.showAtBottom) {
            var bottom = scrolling.atBottom();
            hidden = !bottom;
          } else {
            hidden = true;
          }
        }
      }

      this.change(hidden);
    },

    update: function() /* Scrolling */ {
      this.dHeight = this.$document.prop('body').offsetHeight;
      this.wHeight = this.$window.innerHeight;

      this.previous = this.current;
      this.current = this.$window.pageYOffset;
      this.diff = this.previous - this.current;

      return this;
    }

  });


  angular.module('angular.autoHideStickyHeader')
    .factory('throttle', ['$timeout', throttle]);

  function throttle($timeout) {
    return function(func /* () => void */, threshold /* number */) /* () => void */ {
      var timer, previous = +new Date();
      return function() {
        function execute() {
          func.apply(this, arguments);
          previous = current;
        }

        var fn = execute.bind(this, arguments);

        var current = +new Date();
        if (current > (previous + threshold)) {
          fn();
        } else {
          $timeout.cancel(timer);
          timer = $timeout(fn, threshold);
        }
      }
    }
  }

}(angular);
