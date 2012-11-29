"use strict";

/**
 * Namespace name for the module
 * @type {angular.Module}
 */
var taskmvc = angular.module('taskmvc', []);

/* Blur directive */
taskmvc.directive('taskBlur', function() {
    return function(scope, elem, attrs) {
        elem.bind('blur', function() {
            scope.$apply(attrs.taskBlur);
        });
    };
});


taskmvc.directive('taskFocus', function($timeout) {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.taskFocus, function(bool) {
            if (bool) {
                $timeout(function() {
                    elem[0].focus();
                }, 0, false);
            }
        });
    };
});

taskmvc.controller('TaskController', function ($scope, $location) {

    /**
     * @type {Array}
     */
    $scope.tasks = [];

    /**
     * @type {string}
     */
    $scope.newTask = "";

    /**
     * @type {object}
     * @property
     */
    $scope.editingTask = null;

    /**
     * @property addTask
     * @method addTask
     */
    $scope.addTask = function() {
        var newTask = $scope.newTask;
        if (newTask.length) {
            $scope.tasks.push({
                title: newTask,
                completed: false
            });
        }
        $scope.newTask = "";
    };

    $scope.removeTask = function(task) {
        var index = $scope.tasks.indexOf(task, 0);
        $scope.tasks.splice(index, 1);
    };

    $scope.editTask = function(task) {
        $scope.editingTask = task;
    };

    $scope.doneEditing = function(task) {
        $scope.editingTask = null;
        if (task.title.length === 0) {
            $scope.removeTask(task);
        }
    };
});
