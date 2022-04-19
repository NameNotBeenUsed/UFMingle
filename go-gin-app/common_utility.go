package main

import (
	"fmt"
	"strconv"
	"strings"
)

//将string转为[]int，string中数字用逗号分隔
func convStrToIntList(str string) ([]int, error) {
	if str == "" {
		return []int{}, nil
	}
	strArr := strings.Split(str, ",")
	intList := make([]int, len(strArr))
	for i, v := range strArr {
		var err error
		intList[i], err = strconv.Atoi(v)
		if err != nil {
			return nil, err
		}
	}
	return intList, nil
}

//将[]int转为string，每个元素之间用逗号分隔
func convIntListToStr(list []int) string {
	return strings.Trim(strings.Join(strings.Fields(fmt.Sprint(list)), ","), "[]")
}

//检查数组中是否包含特定数字，并返回其下标
func contains(list []int, num int) (int, bool) {
	for i, v := range list {
		if v == num {
			return i, true
		}
	}
	return -1, false
}

//第一个返回int  index
//第二个返回bool 包含返回true，不包含返回false
func checkIfStrContainsEle(str string, ele int) (int, bool, error) {
	intList, err := convStrToIntList(str)
	if err != nil {
		return -1, false, err
	}
	index, ifContain := contains(intList, ele)
	return index, ifContain, nil
}
