import * as React from 'react';
import {
  AutoSizer,
  Table,
  Column,
  SortDirection,
  // TableCellRenderer,
  TableCellProps,
  SortDirectionType,
} from 'react-virtualized';
import 'react-virtualized/styles.css';

// import { StarPicker } from 'react-star-picker';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import DeleteConfirmationDialog from 'core/components/DeleteConfirmationDialog';
import TagDisplay from 'tag/components/TagDisplay';
import RatingDisplay from 'react-verdict';

import { Movie } from 'movie/types';
import { SortOption } from 'movieTable/types';

const LinkCell = ({
  cellData,
  rowData,
  rowIndex,
  history,
}: TableCellProps & RouteComponentProps) => {
  return <Link to={`/item/${rowData.id}`}>{cellData}</Link>;
};
const TagsCell = ({ cellData, rowData, rowIndex }: TableCellProps) => {
  // TODO handle list of tags
  const tag = cellData[0];
  return <div>{tag ? <TagDisplay value={tag} /> : 'none'}</div>;
};
const LinkWithRouter = withRouter(LinkCell);
const LinkColumn: any = (props: TableCellProps) => (
  <LinkWithRouter {...props} />
);

type MovieTableProps = {
  data: Movie[] | null;
  height: number;
  onSort: (object: SortOption) => void;
  sortBy: string;
  sortDirection: 'DESC' | 'ASC' | undefined;
  deleteMovie: (id: string) => Promise<any>;
};
class MovieTable extends React.Component<MovieTableProps> {
  render() {
    const { data, height, onSort, sortBy, sortDirection } = this.props;

    const tableHeight = !Number.isNaN(height) ? height : 500;

    return (
      <div className="Table">
        {data !== null && (
          <div style={{ backgroundColor: 'ghostwhite' }}>
            <AutoSizer disableHeight>
              {({ width }) => {
                const unitWidth = width / 9.0;
                return (
                  <Table
                    ref="Table"
                    headerHeight={30}
                    height={tableHeight}
                    rowHeight={40}
                    rowCount={data.length}
                    rowGetter={({ index }) => data[index]}
                    width={width}
                    onSort={onSort}
                    sort={this._sort}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                  >
                    <Column
                      label="Title"
                      dataKey="title"
                      width={3 * unitWidth}
                      cellRenderer={LinkColumn}
                    />
                    <Column
                      label="Tags"
                      dataKey="tags"
                      width={3 * unitWidth}
                      cellRenderer={TagsCell}
                      disableSort
                    />

                    <Column
                      label="Average Rating"
                      dataKey="averageRating"
                      width={3 * unitWidth}
                      cellRenderer={({
                        cellData: averageRating,
                        rowIndex,
                        rowData,
                      }) => {
                        if (averageRating) {
                          return (
                            <RatingDisplay value={averageRating || null} />
                          );
                        }
                        return null;
                      }}
                    />
                    <Column
                      label="Fixed"
                      dataKey="fixed"
                      width={3 * unitWidth}
                      disableSort
                    />
                    <Column
                      label="Manage"
                      dataKey="id"
                      width={3 * unitWidth}
                      cellRenderer={({ cellData }) => {
                        return (
                          <DeleteConfirmationDialog
                            onAccept={() => this.props.deleteMovie(cellData)}
                          />
                        );
                      }}
                      disableSort
                    />
                  </Table>
                );
              }}
            </AutoSizer>
          </div>
        )}
      </div>
    );
  }

  _sort = ({
    sortBy,
    sortDirection,
  }: {
    sortBy: string | undefined;
    sortDirection: SortDirectionType | undefined;
  }) => {
    const { sortBy: prevSortBy, sortDirection: prevSortDirection } = this.props;
    let newSortBy = sortBy;
    let newSortDirection = sortDirection;
    // CLEAR sortBy and sortDirection if
    if (prevSortDirection === SortDirection.DESC) {
      newSortBy = undefined;
      newSortDirection = undefined;
    }
    this.props.onSort({ sortBy: newSortBy, sortDirection: newSortDirection });
  };
}

export default MovieTable;
