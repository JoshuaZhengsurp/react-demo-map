export const INITIAL_RADIUS = 10;		// 画笔尺寸
export const INITIAL_HARDNESS = 0.6;	// 画笔硬度

/** 修补渐变开始的颜色 */
export const REPAIR_POINT_INNER_COLOR = 'rgba(0,100,150,1)';
/** 修补渐变结束的颜色 */
export const REPAIR_POINT_OUTER_COLOR = 'rgba(0,100,150,0)';
/** 擦除渐变开始的颜色 */
export const ERASE_POINT_INNER_COLOR = 'rgba(255,255,255,1)';
/** 擦除结束的颜色 */
export const ERASE_POINT_OUTER_COLOR = 'rgba(255,255,255,0)';

export enum EventType {
	Mouseover = 'mouseover',
	Mouseenter = 'mouseenter',
	Mouseout = 'mouseout',
	Mouseleave = 'mouseleave',
	Mouseup = 'mouseup',
	Mousemove = 'mousemove',
	MouseDown = 'mousedown',
	DblClick = 'dblclick',
	Click = 'click',
	ContextMenu = 'contextmenu',
	KeyDown = 'keydown',
	Keyup = 'keyup',
	Keypress = 'keypress',
	Scroll = 'scroll',
	Resize = 'resize',
	Wheel = 'wheel',
	UndoRedoStateChanged = 'undoRedoStateChanged',
}

/** 径向渐变开始圆形的半径 */
export const GRADIENT_INNER_RADIUS = 0;
export const GRADIENT_BEGIN_OFFSET = 0;
export const GRADIENT_END_OFFSET = 1;

/** 默认的变换配置对象 */
export const INITIAL_SCALE_RATIO = 1;
export const INITIAL_TRANSFORM_CONFIG: TransformConfig = {
	scaleRatio: INITIAL_SCALE_RATIO,
	positionRange: {
		minX: 0,
		maxX: 0,
		minY: 0,
		maxY: 0,
	},
};

// 图像平滑
export const DEFALUT_IMAGE_SHOOTH_CHOICE = false