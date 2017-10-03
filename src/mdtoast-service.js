/**
 * Simple angular service to show success and error message
 * @author <pramod.rauniyar@gmail.com>, 2017
 */
(function() {
    'use strict';

    angular
        .module('mdtoast-service',[])
        .factory('toasterService', toasterService);

    toasterService.$inject = ['$mdToast'];

    /* @ngInject */
    function toasterService($mdToast) {
        // init variables
        var delay = 10000;
        var actionText = 'X';
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };

        var toastPosition = angular.extend({}, last);
        /**
         * return object with  success and error
         */
        return {
            success: success,
            error: error
        };

        /**
         * [sanitizePosition to update current and last]
         *
         */
        function sanitizePosition() {

            var current = toastPosition;
            if (current.bottom && last.top) { current.top = false; }
            if (current.top && last.bottom) { current.bottom = false; }
            if (current.right && last.left) { current.left = false; }
            if (current.left && last.right) { current.right = false; }

            last = angular.extend({}, current);
        }

        /**
         * [success - to show the success message]
         * @param  {string} message [message to show]
         * @return {string}         [show message in mdtoast]
         */
        function success(message) {
            showSimpleToast(message, 'success-toast');
        }

        /**
         * [error - to show the error message]
         * @param  {string} message [message to show]
         * @return {string}         [show message in mdtoast]
         */
        function error(message) {
            showSimpleToast(message, 'error-toast');
        }

        /**
         * [showSimpleToast description]
         * @param  {string} message [message to show]
         * @param  {string} type    [which css class to add]
         */
        function showSimpleToast(message, type) {

            var pinTo = getToastPosition();
            var m = (message > 70) ? message.substring(0, 70) + '...' : message;
            $mdToast.show(
                $mdToast.simple({
                    toastClass: type
                })
                .textContent(m)
                .position(pinTo)
                .action(actionText)
                .hideDelay(delay)
            );

        }

        /**
         * [getToastPosition - to get toaster position]
         */
        function getToastPosition() {

            sanitizePosition();

            return Object.keys(toastPosition)
                .filter(function(pos) {
                    return toastPosition[pos];
                })
                .join(' ');
        }
    }
})();
