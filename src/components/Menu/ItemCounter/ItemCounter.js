import "./ItemCounter.style.css"

const ItemCounter = ({itemCount}) => {
    return itemCount > 0 ?
        <div className="ItemCounter">
        {itemCount}
        </div>
        :
        null
}

export default ItemCounter
